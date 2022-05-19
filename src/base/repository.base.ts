import { dataSource } from 'src/common/database-config';
import { EntityTarget, FindManyOptions, FindOneOptions } from 'typeorm';

export function BaseRepository<T extends EntityTarget<any>>(
  entityTarget: T,
): { [key: string]: (...args: any) => any } {
  return {
    create(payload: any) {
      const entity = dataSource.manager.create(entityTarget, payload);
      return dataSource.manager.save(entity);
    },

    createQueryBuilder(alias: string) {
      return dataSource.manager.createQueryBuilder(entityTarget, alias);
    },

    find(options: FindManyOptions, relations?: string[], skip?: number, take?: number) {
      return dataSource.manager.find(entityTarget, { ...options, relations, skip, take });
    },

    findOne(options: FindOneOptions, relations?: string[]) {
      return dataSource.manager.findOne(entityTarget, { ...options, relations });
    },

    findById(id: any, relations?: string[]) {
      return dataSource.manager.findOne(entityTarget, { where: { id }, relations });
    },

    update(conditions: any, payload: any) {
      return dataSource.manager.update(entityTarget, conditions, payload);
    },

    delete(id: any) {
      return dataSource.manager.delete(entityTarget, id);
    },

    getEntityRepository() {
      return dataSource.getRepository(entityTarget);
    },
  };
}
