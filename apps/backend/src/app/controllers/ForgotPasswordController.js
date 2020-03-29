import crypto from 'crypto';
import * as Yup from 'yup';
import { parseISO, isAfter, subDays } from 'date-fns';
import Users from '../models/Users';
import Mail from '../../lib/Mail';

class ForgotPasswordController {
  async store(req, res) {
    try {
      const {
        email,
        redirect = 'http://localhost:3000/resetar-senha',
      } = req.body;

      const user = await Users.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        return res.status(401).json({ error: 'User not found' });
      }

      await user.update({
        token: crypto.randomBytes(10).toString('hex'),
        token_created_at: new Date(),
      });

      Mail.sendMail({
        to: `${user.name} <${user.email}>`,
        subject: 'Recuperação de senha - SAFEZONE',
        template: 'forgot_password',
        context: {
          email: user.email,
          link: `${redirect}/?token=${user.token}`,
        },
      });

      return res.json({
        status: 'OK',
        redirect,
        message: 'Email sended, check your e-mail inbox',
      });
    } catch (err) {
      return res.status(err.status).send({
        error: 'Error, verify your e-mail and try again',
      });
    }
  }

  async update(req, res) {
    try {
      const { token } = req.params;
      const schema = Yup.object().shape({
        password: Yup.string().min(6),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validation fails' });
      }

      const { password } = req.body;

      if (!token) {
        return res.status('400').send({ error: 'Valid token is required' });
      }

      const user = await Users.findOne({
        where: {
          token,
        },
      });

      if (!user) {
        return res.status(401).json({ error: 'User not found' });
      }

      const parsedDate = parseISO(user.token_created_at);

      const twoDaysAgo = subDays(new Date(), 2);

      const tokenExpired = isAfter(twoDaysAgo, parsedDate);

      if (tokenExpired) {
        return res.status(401).send({
          error: 'Token expired, try again',
        });
      }

      await user.update({
        token: null,
        token_created_at: null,
        password,
      });

      return res.json({
        status: 'OK',
        message: 'Success! Your password changed',
      });
    } catch (err) {
      return res.status(err.status).send({ error: 'Error, try again' });
    }
  }
}

export default new ForgotPasswordController();
