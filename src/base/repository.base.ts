import { dataSource } from 'src/common/database-config.common';
import { EntityTarget, FindManyOptions, FindOneOptions } from 'typeorm';

export function BaseRepository<T extends EntityTarget<any>>(
  entityTarget: T,
): { [key: string]: (...args: any) => Promise<any> } {
  return {
    create: (payload: any) => {
      const entity = dataSource.manager.create(entityTarget, payload);
      return dataSource.manager.save(entity);
    },

    save(): Promise<any> {
      return dataSource.manager.save(entityTarget);
    },

    find: (options: FindManyOptions) => {
      return dataSource.manager.find(entityTarget, options);
    },

    findOne: (options: FindOneOptions) => {
      return dataSource.manager.findOne(entityTarget, options);
    },

    findById: (id: any) => {
      return dataSource.manager.findOne(entityTarget, id);
    },

    update: (conditions: any, payload: any) => {
      return dataSource.manager.update(entityTarget, conditions, payload);
    },

    delete: (id: any) => {
      return dataSource.manager.delete(entityTarget, id);
    },
  };
}
