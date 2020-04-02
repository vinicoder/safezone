import * as Yup from 'yup';

import Companies from '../models/Companies';
import CompanyAddress from '../models/CompanyAddress';

class CompanyController {
  async index(req, res) {
    const companies = await Companies.findAll();

    return res.json(companies);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      activity: Yup.string(),
      address: Yup.object(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Failed to login, check your parameters' });
    }

    const { name, activity, address } = req.body;

    const { id } = await Companies.create({ name, activity });

    if (!Object.keys(address).length) {
      return res.json({ id, name, activity });
    }

    const {
      id: address_id,
      latitude,
      longitude,
      place_id,
      city_place_id,
    } = await CompanyAddress.create({
      ...address,
      id,
    });

    return res.json({
      id,
      name,
      activity,
      address_id,
      latitude,
      longitude,
      place_id,
      city_place_id,
    });
  }
}

export default new CompanyController();
