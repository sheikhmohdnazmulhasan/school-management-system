import { FilterQuery, Query } from "mongoose";

class QueryBuilder<T> {
    public modelQuery: Query<T[], T>;
    public query: Record<string, unknown>;

    constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
        (this.modelQuery = modelQuery, this.query = query);
    };

    // for search
    search(searchableFields: string[]) {

        if (this?.query?.searchTerm) {

            this.modelQuery = this.modelQuery.find({
                $or: searchableFields.map((field) => ({
                    [field]: { $regex: this.query?.searchTerm, $options: 'i' }
                }) as FilterQuery<T>)
            });
        };

        return this
    };

    // for filtering;
    filter() {
        const queryObj = { ...this.query };

        const excludeFields: string[] = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
        excludeFields.forEach(ele => delete queryObj[ele]);

        this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);

        return this;
    };

    // sort
    sort() {
        const sort: string = (this?.query?.sort as string)?.split(',')?.join(' ')  || '-createdAt';
        this.modelQuery = this.modelQuery.sort(sort);

        return this;
    };

    // paginate;
    paginate() {
        const page: number = Number(this?.query?.page) || 1;
        const limit: number = Number(this?.query?.limit) || 1;
        const skip = (page - 1) * limit;

        this.modelQuery = this.modelQuery.skip(skip).limit(limit);

        return this

    };

    fields() {
        const fields: string = (this?.query?.fields as string)?.split(',')?.join(' ') || "-__v";

        this.modelQuery = this.modelQuery.select(fields);

        return this
    }


} //// main scope;

export default QueryBuilder;