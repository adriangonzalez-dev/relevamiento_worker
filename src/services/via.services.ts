
  import { Repository } from 'typeorm';
  import { Via } from '../entity/Via.entity';
import { logGenerator } from '../logs/logsGenerator';
  
  export class ViaSolicitudService {
    constructor(
      private readonly viaRepository: Repository<Via>,
    ) {}
  
    /* async findAll() {
      try {
        const vias = await this.viaRepository.find({
          where: { active: true },
        });
        return vias;
      } catch (error) {
        throw new BadRequestException('No se encontraron vias de solicitud');
      }
    } */
  
    /* async findOne(id: number) {
      try {
        const via = await this.viaRepository.findOne({
          where: { id, active: true },
        });
        if (!via) throw new Error();
        return via;
      } catch (error) {
        throw new NotFoundException('No se encontro la via de solicitud');
      }
    } */
  
    async findOneByName(name: string) {
      try {
        const via = await this.viaRepository.findOne({
          where: { name, active: true },
        });
        if (!via) throw new Error();
        return via;
      } catch (error) {
        logGenerator(`No se encontro la via de solicitud ${name}`)
        logGenerator(error)
      }
    }
  
    /* async update(id: number, updateViaSolicitudDto: UpdateViaSolicitudDto) {
      try {
        let via = await this.findOne(id);
        via = { ...via, ...updateViaSolicitudDto };
        await this.viaRepository.save(via);
        return via;
      } catch (error) {
        throw new BadRequestException(error.message);
      }
    } */
  
    /* async remove(id: number) {
      try {
        const via = await this.findOne(id);
        via.active = false;
        await this.viaRepository.save(via);
        return via;
      } catch (error) {
        throw new BadRequestException(error.message);
      }
    } */
  }
  