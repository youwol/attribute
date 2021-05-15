# @youwol/attribute


## Description
Allows to decompose series in other user-defined series.

Let say that you have a serie `W` with `itemSize=6`, meaning that items
are potentially components of symmetric rank 2 tensors of dimension 3.
Then, using this library, it is possible to get names and underlaying
series of decompositions. For instance, it is possible to get the components (`itemSize=1`),
eigen values (`itemSize=1`), eigen vectors(`itemSize=3`)... from this original `W` serie.

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


