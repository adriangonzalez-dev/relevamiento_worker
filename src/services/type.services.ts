
import { InvgateService } from '../invgate/invgate.service';
import { Repository } from 'typeorm';
import { Type } from '../entity/Type.entity';
import { logGenerator } from '../logs/logsGenerator';

export class TipoService {
  constructor(
    private readonly invgateService: InvgateService,
    private readonly typeRepository: Repository<Type>,
  ) {}

  async updateTypes() {
    try {
      const categories = await this.invgateService.getAllCategories();
      categories.forEach(async (category) => {
        const existsCategory = await this.typeRepository.findOne({
          where: { id: Number(category.id) },
        });
        if (existsCategory) {
          if (existsCategory.name !== category.name) {
            existsCategory.name = category.name;
            await this.typeRepository.save(existsCategory);
          }
        } else {
          const newCategory = this.typeRepository.create({
            id: Number(category.id),
            name: category.name,
          });
          newCategory.id = Number(newCategory.id);
          await this.typeRepository.save(newCategory);
        }
      });
      const types = await this.typeRepository.find();
      logGenerator('Entity Type actualizada')
    } catch (error) {
      logGenerator('Error al actualizar Type')
      logGenerator(error)
    }
  }
}
