
import { InvgateService } from '../invgate/invgate.service';
import { Data } from '../entity/Data.entity';
import { Repository } from 'typeorm';
import { CountryService } from './country.services';
import { TipoService } from './type.services';
import { ViaSolicitudService } from './via.services';
import { logGenerator } from '../logs/logsGenerator';

export class DataService {
  constructor(
    private readonly invgateService: InvgateService,
    private readonly countryService: CountryService,
    private readonly typeService: TipoService,
    private readonly viaService: ViaSolicitudService,
    private readonly dataRepository: Repository<Data>,
  ) {
    this.updateDB()
  }

  /* async create(createDataDto: CreateDataDto) {
    try {
      const data = this.dataRepository.create(createDataDto);
      await this.dataRepository.save(data);
      return await this.findAll();
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.message);
    }
  } */
  async updatedData() {
    try {
      const tickets = await this.invgateService.getAllInfoInvgate();
      const invgateVia = await this.viaService.findOneByName('Invgate SIA');
      if(!invgateVia){
        logGenerator('No se encontró la via ingate SIA')
        return;
      }
      if (!tickets) return;
      tickets.forEach(async (ticket) => {
        const existsTicket = await this.dataRepository.findOne({
          where: { id_invgate: Number(ticket.id) },
        });
        /* if (!existsTicket) {
          const newTicket = this.dataRepository.create({
            id_invgate: ticket.id,
            country: ticket.location_id,
            agent: ticket.assigned_id,
            implementation_date: ticket.closed_at,
            request: ticket.title,
            request_date: ticket.created_at,
            type: ticket.category_id,
            via: invgateVia.id,
          }); */
          if(!existsTicket){
              const newTicket = this.dataRepository.create({
                id_invgate: ticket.id,
                country: ticket.location_id,
                agent: ticket.assigned_id,
                implementation_date: ticket.closed_at,
                request: ticket.title,
                request_date: ticket.created_at,
                type: ticket.category_id,
                via: invgateVia.id,
            })
            await this.dataRepository.save(newTicket);
          }
      });
      logGenerator('Data actualizada de invgate')
    } catch (error) {
        logGenerator('No se pudo actualizar la data de invgate')
        logGenerator(error)
    }

  }

  /**
   * La función busca tickets abiertos y actualiza su fecha de implementación si se han solucionado.
   * @returns la variedad de boletos abiertos.
   */
  async checkingClosedIncident() {
    try {
      const openTickets = await this.dataRepository.find();
      if (!openTickets) return;
      const newOpenTickets = openTickets.filter(ticket=>ticket.implementation_date === null)
      if (newOpenTickets.length < 1) return;
      const idsTickets = newOpenTickets
        .map((ticket) => {
          if (ticket.id_invgate) {
            return ticket.id_invgate;
          }
        })
        .filter((item) => item !== undefined && item !== null);
        if (!idsTickets) return;
        if (idsTickets.length === 0) return;
        const tickets = await this.invgateService.getIncidentsById(idsTickets);
        if(!tickets) return;
        for (const ticket of newOpenTickets) {
            for (const incident of tickets) {
            if (Number(ticket.id_invgate) === Number(incident.id)) {
                if (incident.solved_at !== null) {
                ticket.implementation_date = Number(incident.solved_at);
                await this.dataRepository.save(ticket);
                }
            }
            }
        }
      /* openTickets.forEach(async (ticket) => {
        tickets.forEach(async (incident) => {
          if (ticket.id === incident.id && incident.solved_at !== null) {
            ticket.implementation_date = Number(incident.solved_at);
          }
          await this.dataRepository.save(ticket);
        });
      }); */
      /* for (const ticket of openTickets) {
        const checkedTicket = await this.invgateService.getIncidentById(
          ticket.id,
        );
        if (checkedTicket.solved_at) {
          ticket.implementation_date = Number(checkedTicket.solved_at);
          await this.dataRepository.save(ticket);
        }
      } */
      logGenerator('Tickets actualizados')
    } catch (error) {
      logGenerator('Error al actualizar los tickets')
      logGenerator(error)
    }
  }

  async updateDB() {
    try {
      await this.countryService.updatedCountries();
      await this.typeService.updateTypes();
      await this.updatedData();
      await this.checkingClosedIncident();
    } catch (error) {
      console.log(error);
    }
  }
}
