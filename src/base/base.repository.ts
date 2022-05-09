import { dataSource } from 'src/common/database-config.common';
import { BaseEntity, EntityTarget } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

const entityManager = dataSource.manager;
export const BaseRepository: Record<
  string,
  <T extends EntityTarget<any>>(a: T, ...options: any) => void
> = {
  create: (target, data) => {
    const entity = entityManager.create(target, data);
    return entityManager.save(entity);
  },

  find: (target, options) => {
    return entityManager.find(target, options);
  },

  findOne: (target, options) => {
    return entityManager.findOne(target, options);
  },

  findById: (target, id) => {
    return entityManager.findOne(target, id);
  },

  update: (target, conditions, update) => {
    return entityManager.update(target, conditions, update);
  },

  delete: (target, id) => {
    return entityManager.delete(target, id);
  },
};
