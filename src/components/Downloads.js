import JSZip from "jszip"
import { saveAs } from 'file-saver'
import camelCase from "lodash/camelCase"

const getFunctionsCode = (functions = []) => functions.map(item => item.code).join('\n\n\n')

const getComponent = (type, style, content) => `<${ type } style={ ${ style } } { ...props }>${ content }</${ type }>`

const getStyles = styleObject => [
    '{',
    ...Object
        .entries(styleObject)
        .map(([ key, value ]) => `\t\t${ camelCase(key) }: '${ value }',`),
    '\t}',
].join('\n')

const getComponentCode = component => [
    `import { ${ component.functions.map(f => f.name).join(', ') } } from './${ component.name }_Functions.js'`,
    '',
    `const ${ component.name } = props => {`,
    `\tconst styles = ${ getStyles(component.style) }`,
    '',
    `\treturn ${ getComponent(component.type, 'styles', component.content) }`,
    '}',
    '',
    `export default ${ component.name }`
].join('\n')

class Code {

    zipfile = new JSZip()

    constructor (components = []) {
        this.components = components
    }

    generateCodeFiles() {
        this.zipfile.folder('components')
        for (let i = 0; i < this.components.length; i++) {
            if (this.components[ i ].functions.length) {
                this.zipfile
                    .folder('components')
                    .folder(this.components[ i ].name)
                    .file(`${ this.components[ i ].name }_Functions.js`, getFunctionsCode(this.components[ i ].functions))
            }

            this.zipfile
                .folder('components')
                .folder(this.components[ i ].name)
                .file(`${ this.components[ i ].name }.jsx`, getComponentCode(this.components[ i ]))
        }
    }

    download() {
        this.zipfile
            .generateAsync({ type: 'blob' })
            .then(file => saveAs(file, 'Kyo Flow Customized Components.zip'))
    }

}

export default Code