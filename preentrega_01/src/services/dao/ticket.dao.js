import ticketModel from "../models/ticket.schema.js";

export default class ticketService {

    crearTicket = async (pusTicket) => {
        let ticket = await ticketModel.create({email: pusTicket.usuario, total: pusTicket.total})
        return ticket
    }
}