import type { IFactory, IFactoryTuple, IFactories } from './types';
import allNames from './utils/all-names.js';

const cleaner = <C>(instance: any, container: C, name: keyof C) => {
  container[name] = null as any;
};

const decorateFactory = <C, N extends keyof C>(
  factory: IFactory<C, N>,
): IFactoryTuple<C, N> => [factory, cleaner];

const decorateTuple = <C, N extends keyof C>([
  factory,
  initializer,
]: IFactoryTuple<C, N>): IFactoryTuple<C, N> => [
  factory,
  (instance: C[N], container: C, name: N) => {
    initializer(instance, container, name);
    cleaner(instance, container, name);
  },
];

const decorateItemBinding = <C, N extends keyof C>(
  itemBinding: IFactory<C, N> | IFactoryTuple<C, N>,
): IFactoryTuple<C, N> =>
  typeof itemBinding === 'function'
    ? decorateFactory(itemBinding)
    : decorateTuple(itemBinding);

const decorateFactories = <C extends object>(
  factories: IFactories<C>,
): IFactories<C> =>
  allNames(factories).reduce(
    (newObject, name) =>
      Object.defineProperty(newObject, name, {
        ...Object.getOwnPropertyDescriptor(factories, name),
        value: decorateItemBinding(factories[name]),
      }),
    Object.create(null),
  );

const multiple: {
  <C, N extends keyof C>(
    itemBinding: IFactory<C, N> | IFactoryTuple<C, N>,
  ): IFactoryTuple<C, N>;
  <C extends object>(factories: IFactories<C>): IFactories<C>;
} = <C extends object, N extends keyof C>(
  bindingOrFactories: IFactory<C, N> | IFactoryTuple<C, N> | IFactories<C>,
) =>
  (!Array.isArray(bindingOrFactories) && typeof bindingOrFactories === 'object'
    ? decorateFactories(bindingOrFactories)
    : decorateItemBinding(bindingOrFactories)) as any;

export default multiple;
