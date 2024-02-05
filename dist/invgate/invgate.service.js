"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvgateService = void 0;
class InvgateService {
    constructor(axiosAdapter) {
        this.axiosAdapter = axiosAdapter;
        this.url_api = 'https://siaint.cloud.invgate.net/api/v1';
        this.url_api_olap = 'https://siaint.cloud.invgate.net/api-olap/v1';
        this.users = [423, 161, 1059, 1740, 1944];
    }
    /**
     * La función `getAllInfoInvgate` recupera de forma asincrónica incidentes para múltiples agentes y
     * los combina en una sola matriz.
     * @returns una serie de incidentes.
     */
    getAllInfoInvgate() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const arrayPromises = this.users.map((id) => __awaiter(this, void 0, void 0, function* () {
                    return yield this.getIncidentsForAgent(id);
                }));
                const results = yield Promise.all(arrayPromises);
                const combinedIncidents = results.reduce((acc, agentIncidents) => {
                    return [...acc, ...agentIncidents];
                }, []);
                return combinedIncidents;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    /*
      async getTest() {
        try {
          const data = await this.getAllInfoInvgate();
          return data.map((incident) => incident.category_id);
        } catch (error) {
          console.log(error);
        }
      } */
    getAllCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.axiosAdapter.getInvgate(`${this.url_api}/categories`);
            return data;
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { records } = yield this.axiosAdapter.getInvgate(`${this.url_api_olap}/records/users?filter=id,eq,${id}`);
                return records;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getAllTypes() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = this.axiosAdapter.getInvgate(`${this.url_api}/incident.attributes.type`);
            return data;
        });
    }
    getAllLocations() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = this.axiosAdapter.getInvgate(`${this.url_api}/locations`);
            return data;
        });
    }
    getIncidentsForAgent(idAgent) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.axiosAdapter.getInvgate(`${this.url_api}/incidents.by.agent?id=${idAgent}`);
            return Object.values(data.requests);
        });
    }
    getIncidentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.axiosAdapter.getInvgate(`${this.url_api}/incidents?ids[]=${id}`);
                return Object.values(data)[0];
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getIncidentsById(tickets) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const link = tickets.join('&ids[]=');
                const data = yield this.axiosAdapter.getInvgate(`${this.url_api}/incidents?ids[]=${link}`);
                return Object.values(data);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.InvgateService = InvgateService;
