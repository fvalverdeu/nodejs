import Repository from './repository'
import { Country, Profile, Region, Zone } from './model'

const repository = new Repository()

export default class {
  async findAllCountry(): Promise<Country[]> {
    const data = await repository.findAllCountry()
    return data
  }

  async findByIsoCountry(iso: string): Promise<Country> {
    const data = await repository.findByIsoCountry(iso)
    const keys = Object.keys(data || {}).length

    if (keys < 1) return null

    return data
  }

  async findAllProfile(): Promise<Profile[]> {
    const data = await repository.findAllProfile()
    return data
  }

  async findAllRegion(): Promise<Region[]> {
    const data = await repository.findAllRegion()
    return data
  }

  async findByIsoRegion(iso: string): Promise<Region[]> {
    const data = await repository.findByIsoRegion(iso)
    const keys = Object.keys(data || {}).length
    if (keys < 1) return null
    return data
  }

  async findAllZone(): Promise<Zone[]> {
    const data = await repository.findAllZone()
    return data
  }

  async findByRegionZone(iso: string, coderegion: string): Promise<Zone[]> {
    const data = await repository.findByRegionZone(iso, coderegion)
    const keys = Object.keys(data || {}).length
    if (keys < 1) return null
    return data
  }
}
