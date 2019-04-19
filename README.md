
# ipycubelab

[![Build Status](https://travis-ci.org/nmearl/ipycubelab.svg?branch=master)](https://travis-ci.org/nmearl/ipycubelab)
[![codecov](https://codecov.io/gh/nmearl/ipycubelab/branch/master/graph/badge.svg)](https://codecov.io/gh/nmearl/ipycubelab)


A Custom Jupyter Widget Library

## Installation

You can install using `pip`:

```bash
pip install ipycubelab
```

Or if you use jupyterlab:

```bash
pip install ipycubelab
jupyter labextension install @jupyter-widgets/jupyterlab-manager
```

If you are using Jupyter Notebook 5.2 or earlier, you may also need to enable
the nbextension:
```bash
jupyter nbextension enable --py [--sys-prefix|--user|--system] ipycubelab
```
