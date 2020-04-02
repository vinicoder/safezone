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
      street: Yup.string().required(),
      number: Yup.string().required(),
      zipcode: Yup.string()
        .max(8)
        .required(),
      city: Yup.string().required(),
      state: Yup.string()
        .max(2)
        .required(),
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

    const { id, latitude, longitude } = await CompanyAddress.create({
      ...req.body,
      company_id,
    });

    return res.json({ id, latitude, longitude, company_id });
  }
}

export default new CompanyAddressController();
