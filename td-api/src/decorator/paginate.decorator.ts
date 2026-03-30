import { SelectQueryBuilder } from 'typeorm';

export function PaginateAndSort(
  defaultSortField = 'createdAt',
  defaultSortOrder: 'ASC' | 'DESC' = 'DESC',
) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;
    console.log('a');
    descriptor.value = async function (...args: any[]) {
      // Assuming the first argument is always the query object DTO
      console.log(args);
      const query = args[0] || {};
      const page = Number(query.page) || 1;
      const limit = Number(query.limit) || 10;
      // You can also dynamically accept sort field from query if they exist
      const sortField = query.sortBy || defaultSortField;
      const sortOrder = query.sortOrder || defaultSortOrder;

      // Execute the original method which must return the query builder
      const qb: SelectQueryBuilder<any> = await originalMethod.apply(
        this,
        args,
      );

      // Mutate the query builder with pagination & sorting rules
      qb.limit(limit)
        .offset((page - 1) * limit)
        .orderBy(`${qb.alias}.${sortField}`, sortOrder);

      // Evaluate and return the results!
      return await qb.getMany();
    };

    return descriptor;
  };
}
