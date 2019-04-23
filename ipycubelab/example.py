#!/usr/bin/env python
# coding: utf-8

# Copyright (c) Nicholas Earl.
# Distributed under the terms of the Modified BSD License.

"""
TODO: Add module docstring
"""

from ipywidgets import DOMWidget
from traitlets import Unicode, Bool, validate, TraitError
from ._frontend import module_name, module_version


class ExampleWidget(DOMWidget):
    """TODO: Add docstring here
    """
    _model_name = Unicode('ExampleModel').tag(sync=True)
    _model_module = Unicode(module_name).tag(sync=True)
    _model_module_version = Unicode(module_version).tag(sync=True)
    _view_name = Unicode('ExampleView').tag(sync=True)
    _view_module = Unicode(module_name).tag(sync=True)
    _view_module_version = Unicode(module_version).tag(sync=True)

    value = Unicode('example@example.com', help="The email value").tag(sync=True)

    # Basic validator for the email value
    @validate('value')
    def _valid_value(self, proposal):
        if proposal['value'].count("@") != 1:
            raise TraitError('Invalid email value: it must contain an "@" character')
        if proposal['value'].count(".") == 0:
            raise TraitError('Invalid email value: it must contain at least one "." character')
        return proposal['value']
