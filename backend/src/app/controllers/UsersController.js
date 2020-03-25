import * as Yup from 'yup';

import Users from '../models/Users';
import Genders from '../models/Genders';

class UsersController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const userExists = await Users.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const { id, name, email } = await Users.create(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  async index(req, res) {
    if (!req.userAdmin) {
      return res.status(401).json({
        error: "You don't have permission to access this information",
      });
    }

    const users = await Users.findAll();

    return res.json(users);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      gender_id: Yup.number()
        .min(1)
        .max(1),
      birth_date: Yup.date(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email, oldPassword, gender_id, birth_date } = req.body;

    const user = await Users.findByPk(req.userId);

    if (email && email !== user.email) {
      const userExists = await Users.findOne({
        where: {
          email,
        },
      });

      if (userExists) {
        return res.status(400).json({ error: 'User already exists' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    if (gender_id) {
      const gender = await Genders.findOne({
        where: {
          id: gender_id,
        },
      });

      if (!gender) return res.status(400).json({ error: 'Gender not found' });
    }

    const { id, name } = await user.update(req.body);

    return res.json({ id, name, email, gender_id, birth_date });
  }
}
export default new UsersController();
