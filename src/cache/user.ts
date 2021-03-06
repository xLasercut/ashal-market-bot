import * as cron from 'node-cron'
import {IUserData} from '../interfaces'
import {config, logger} from '../app/init'
import {LOG_BASE} from '../app/logging'
import axios from 'axios'

class UserCache {
  protected _name: string = 'user'
  protected _loading = false
  protected _reloadSchedule: cron.ScheduledTask
  protected _users: Array<IUserData>

  constructor() {
    this.startCache()
  }

  public isLoading(): boolean {
    return this._loading
  }

  public startCache(): void {
    if (this._reloadSchedule) {
      this._reloadSchedule.destroy()
    }
    this._reloadCache()
    this._reloadSchedule = cron.schedule(config.dict.cacheRefreshRate, () => {
      this._reloadCache()
    })
  }

  public getDiscordId(userId: number): string {
    for (let user of this._users) {
      if (user.id === userId) {
        return user.contact_discord_id
      }
    }
    return ''
  }

  public getUserId(discordId: string): number {
    for (let user of this._users) {
      if (user.contact_discord_id === discordId) {
        return user.id
      }
    }
    return null
  }

  protected async _reloadCache(): Promise<any> {
    try {
      logger.writeLog(LOG_BASE.CACHE001, {
        type: this._name,
        stage: 'start',
        rate: config.dict.cacheRefreshRate
      })
      this._loading = true
      const body = JSON.stringify({
        password: config.dict.apiPassword
      })

      let response = await axios.post(config.dict.userListApiUrl, body)
      this._users = response.data.users

      logger.writeLog(LOG_BASE.CACHE001, {
        type: this._name,
        stage: 'finish',
        rate: config.dict.cacheRefreshRate
      })

      this._loading = false
    } catch (e) {
      logger.writeLog(LOG_BASE.CACHE002, {
        error: e.response.statusText,
        status: e.response.status
      })
      this._loading = false
    }
  }
}

export {UserCache}
