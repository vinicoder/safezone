import * as Yup from 'yup';

import Companies from '../models/Companies';
import CompanyAddress from '../models/CompanyAddress';

class CompanyAddressController {
  async index(req, res) {
    const { id: company_id } = req.params;

    const company = await Companies.findByPk(company_id);

    if (!company) {
      return res.status(400).json({ error: 'Company not found.' });
    }

    const address = await CompanyAddress.findOne({
      where: {
        company_id,
      },
      include: {
        model: Companies,
        as: 'company',
        where: {
          id: company_id,
        },
        attributes: {
          exclude: ['id'],
        },
      },
    });

    return res.json(address);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      place_id: Yup.string(),
      city_place_id: Yup.string(),
      street: Yup.string(),
      number: Yup.string(),
      zipcode: Yup.string().max(8),
      city: Yup.string(),
      state: Yup.string().max(2),
      complement: Yup.string(),
      latitude: Yup.string(),
      longitude: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Invalid request' });
    }

    const { id: company_id } = req.params;

    const company = await Companies.findByPk(company_id);

    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }

    const { id, latitude, longitude, place_id } = await CompanyAddress.create({
      ...req.body,
      company_id,
    });

    return res.json({ id, latitude, longitude, place_id, company_id });
  }
}

export default new CompanyAddressController();
