import * as Yup from 'yup';

import Companies from '../models/Companies';
import CompanyAddress from '../models/CompanyAddress';

class CityController {
  async index(req, res) {
    const schema = Yup.object().shape({
      city_place_id: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Failed to validate, check your parameters' });
    }

    const { city_place_id } = req.body;

    const companies = await CompanyAddress.findAll({
      include: [
        {
          model: Companies,
          as: 'company',
        },
      ],
      where: {
        city_place_id,
      },
    });

    return res.json(companies);
  }
}

export default new CityController();
