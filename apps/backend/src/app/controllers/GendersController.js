import * as Yup from 'yup';

import Genders from '../models/Genders';

class Gender {
  async index(_, res) {
    const genders = await Genders.findAll();

    return res.json(genders);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      abbreviation: Yup.string().required(),
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { description } = req.body;

    const genderExists = await Genders.findOne({
      where: {
        description,
      },
    });

    if (genderExists) {
      return res.status(400).json({ error: 'Gender already exists.' });
    }

    const gender = await Genders.create(req.body);

    return res.json(gender);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      abbreviation: Yup.string().required(),
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;

    const { abbreviation, description } = req.body;

    const gender = await Genders.findByPk(id);

    if (!gender) {
      return res.status(400).json({ error: 'Gender does not exists' });
    }

    gender.abbreviation = abbreviation;
    gender.description = description;

    await gender.save();

    return res.json(gender);
  }

  async delete(req, res) {
    const { id } = req.params;

    const gender = await Genders.findByPk(id);

    if (!gender) {
      return res.status(400).json({ error: 'Gender does not exists' });
    }

    await Genders.destroy({
      where: { id },
    });

    return res.status(200).json({ ok: 'Gender deleted' });
  }
}

export default new Gender();
