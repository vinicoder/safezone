import * as Yup from 'yup';

import Labels from '../models/Labels';

class LabelsController {
  async index(_, res) {
    const labels = await Labels.findAll();

    return res.json(labels);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { description } = req.body;

    const labelExists = await Labels.findOne({
      where: {
        description,
      },
    });

    if (labelExists) {
      return res.status(400).json({ error: 'Label already exists.' });
    }

    const label = await Labels.create(req.body);

    return res.json(label);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;

    const { description } = req.body;

    const label = await Labels.findByPk(id);

    if (!label) {
      return res.status(400).json({ error: 'Label does not exists' });
    }

    label.description = description;

    await label.save();

    return res.json(label);
  }

  async delete(req, res) {
    const { id } = req.params;

    const label = await Labels.findByPk(id);

    if (!label) {
      return res.status(400).json({ error: 'Label does not exists' });
    }

    await Labels.destroy({
      where: { id },
    });

    return res.status(200).json({ ok: 'Label deleted' });
  }
}

export default new LabelsController();
