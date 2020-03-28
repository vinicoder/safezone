import * as Yup from 'yup';

import Companies from '../models/Companies';

class CompanyController {
  async index(req, res) {
    const companies = await Companies.findAll();

    return res.json(companies);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      activity: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Failed to login, check your parameters' });
    }

    const { id, name, activity } = await Companies.create(req.body);

    return res.json({ id, name, activity });
  }
}

export default new CompanyController();
