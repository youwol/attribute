# @youwol/attribute


## Description
Allows to decompose series in other user-defined series.

Let say that you have a serie `W` with `itemSize=6`, meaning that items
are potentially components of symmetric rank 2 tensors of dimension 3.
Then, using this library, it is possible to get names and underlaying
series of decompositions. For instance, it is possible to get the components (`itemSize=1`),
eigen values (`itemSize=1`), eigen vectors(`itemSize=3`)... from this original `W` serie.

Example
```ts
// Create a manager according to a DataFrame df
const mng = new AttributeManager(df, [
    new PositionDecomposer,    // access to x, y and z
    new EigenValuesDecomposer, // access to the eigen values
])

// Get names with itemSize = 1 (scalar)
const names = mng.names(1) // ['x', 'y', 'z', 'S1', 'S2', 'S3']

const S1 = mng.serie(1, 'S1')
```

## Documentation
Documentation can be found [here](https://youwol.github.io/attribute/dist/docs)

## Use 
To install the required dependencies:
```shell
yarn 
```
To build for development:
```shell
yarn build:dev
```
To build for production:
```shell
yarn build:prod
```

To test:
```shell
yarn test
```


