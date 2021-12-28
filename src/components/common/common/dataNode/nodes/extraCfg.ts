const extraCfg: any = {
    'math-add': {},
    'math-subtract': {},
    'math-multiply': {},
    'math-divide': {},
    'math-average': {},
    'math-residue': {},
    'object-add-key': [{ key: '', value: ''}],
    'object-delete-key': [],
    'object-change-key': [{ from: '', to: '' }],
    'object-change-value': [{ key: '', value: ''}],
    'object-get-value': { key: '' },
    'object-value-to-array': {},
    'object-key-to-array': {},
    'static-string': { value: '' },
    'static-number': { value: '' },
    'static-boolean': { value: '' },
    'transform-to-string': {},
    'transform-to-number': {},
    'transform-to-boolean': {},
    'logic-switch-map': [{ default: '', to: ''}],
    'logic-judge': {
        f: '',
        s: '',
        judge: [
            {
                left: '',
                right: '',
                compare: '',
                leftSign: '',
                rightSign: ''
            }
        ]
    },
    'array-filter': {},
    'array-loop': {},
    'array-find': {},
    'array-concat': {},
}

export default extraCfg
