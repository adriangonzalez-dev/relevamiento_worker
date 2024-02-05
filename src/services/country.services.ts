import { Repository } from 'typeorm';
import { InvgateService } from '../invgate/invgate.service';
import { Country } from '../entity/Country.entity';
import { logGenerator } from '../logs/logsGenerator';

export class CountryService {
  constructor(
    private readonly invgateService: InvgateService,
    private readonly countryRepository: Repository<Country>,
  ) {}

  async findAll() {
    return await this.countryRepository.find({
      where: { active: true },
    });
  }

  async updatedCountries() {
    try {
      const countries = await this.invgateService.getAllLocations();
      countries.forEach(async (country) => {
        const existsCountry = await this.countryRepository.findOne({
          where: { id: Number(country.id) },
        });
        if (existsCountry) {
          if (existsCountry.name !== country.name) {
            existsCountry.name = country.name;
            await this.countryRepository.save(existsCountry);
          }
        } else {
          const newCountry = this.countryRepository.create({
            id: Number(country.id),
            name: country.name,
          });
          await this.countryRepository.save(newCountry);
        }
      });
      logGenerator('Entity Country actualizada')
    } catch (error) {
        logGenerator('Error al actualizar Country')
        logGenerator(error)
    }
  }
}
