# uglicssy-preset-angular
#### Uglicssy preset for AngularJS 1.x applications.
uglicssy-preset-angular is an NPM package designed for usage with the [uglicssy](https://github.com/matewka/uglicssy) package.
It adds the _uglicssy_'s functionality to `ng-class` and `data-ng-class` HTML attributes.

##### Installation

1. Download and save the package

  ```bash
  npm i --save-dev uglicssy-preset-angular
  ```
2. Add it to the _.uglicssyrc_ config file

  ```json
  {
    ...
    "presets": ["uglicssy-preset-angular"]
  }
  ```