import { FindOneOptions } from "typeorm/find-options/FindOneOptions";

import { Project, User, Issue, Comment } from "@/models";
import { EntityNotFoundError, BadUserInputError } from "@/errors";
import { generateErrors } from "@/utils/validations";

type EntityConstructor = 
    | typeof Project
    | typeof User
    | typeof Issue
    | typeof Comment;
type EntityInstance = Project | User | Issue | Comment;

const entites: { [key: string]: EntityConstructor } = {
    Comment,
    Issue,
    Project,
    User,
};

type findEntityOrThrowOptions = {
    id?: number | string,
    options?: FindOneOptions,
};

export const findEntityOrThrow = async <T extends EntityConstructor>(
    Constructor: T,
    options: findEntityOrThrowOptions,
): Promise<InstanceType<T>> => {

    const instance = options.id ? await Constructor.findOne(options.id, options.options) : await Constructor.findOne(options.options);

    if (!instance) {
        throw new EntityNotFoundError(Constructor.name);
    }
    return instance;
};

export const validateAndSaveEntity = async <T extends EntityInstance>(
    instance: T
): Promise<T> => {

    const Constructor = entites[instance.constructor.name];

    if ("validations" in Constructor) {
        const errorFields = generateErrors(instance, Constructor.validations);
        if (Object.keys(errorFields).length > 0) {
            throw new BadUserInputError({ fields: errorFields });
        }
    }

    return instance.save() as Promise<T>;
};

export const createEntity = async <T extends EntityConstructor>(
    Constructor: T,
    input: Partial<InstanceType<T>>
): Promise<InstanceType<T>> => {
    
    const instance = Constructor.create(input);
    
    if (instance instanceof User) {
        instance.hashPassword();
    }

    return validateAndSaveEntity(instance as InstanceType<T>);
}

export const updateEntity = async <T extends EntityConstructor>(
    Constructor: T,
    id: number | string,
    input: Partial<InstanceType<T>>
): Promise<InstanceType<T>> => {
    const instance = await findEntityOrThrow(Constructor, { id });
    Object.assign(instance, input);
    return validateAndSaveEntity(instance);
}

export const deleteEntity = async <T extends EntityConstructor>(
    Constructor: T,
    id: number | string,
): Promise<InstanceType<T>> => {
    const instance = await findEntityOrThrow(Constructor,{ id });
    await instance.remove();
    return instance;
}
