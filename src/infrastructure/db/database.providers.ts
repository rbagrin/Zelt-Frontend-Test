import { Sequelize } from 'sequelize-typescript';
import { Hero } from 'src/domain/hero/hero.entity';
import { User } from 'src/domain/user/user.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: 'src/infrastructure/db/database.sqlite',
      });
      sequelize.addModels([User, Hero]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
