
  import { Role } from '../entity/Role.entity';
  import { Repository } from 'typeorm';
  import { Agente } from '../entity/Agent.entity';
import { logGenerator } from '../logs/logsGenerator';
  

  export class AgenteService {
    constructor(
      private readonly roleRepository: Repository<Role>,
      private readonly agentRepository: Repository<Agente>,
    ) {}
  
    async findAll() {
      try {
        const users = await this.agentRepository.find({
          where: { active: true },
          relations: ['role'],
        });

        return users;
      } catch (error) {
        return error
      }
    }
  
    async findOne(id: number) {
      try {
        const user = await this.agentRepository.findOne({
          where: { id, active: true },
        });
        if (!user) throw new Error();
        return user;
      } catch (error) {
        return error
      }
    }
  }
  