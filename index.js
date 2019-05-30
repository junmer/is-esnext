 /*
 * @file check es-next
 * @author junmer
 * @ref https://github.com/ecomfe/fecs/blob/master/lib/js/esnext.js
 */

var parser = require('cherow');
var Traverser = require('eslint/lib/util/traverser');

/**
 * PARSER CONFIG
 */
var PARSER_CONFIG = {
    ecmaVersion: 6,
    comment: true,
    tokens: true,
    range: true,
    loc: true
};

/**
 * ESNext 特性类型
 */
var ESNEXT_NODETYPES = {
    AssignmentPattern: 1,
    ArrayPattern: 1,
    ArrowFunctionExpression: 1,
    ClassBody: 1,
    ClassDeclaration: 1,
    ClassExpression: 1,
    Decorator: 1,
    ExperimentalRestProperty: 1,
    ExperimentalSpreadProperty: 1,
    ForOfStatement: 1,
    MetaProperty: 1,
    MethodDefinition: 1,
    ObjectPattern: 1,
    RestElement: 1,
    SpreadElement: 1,
    SpreadProperty: 1,
    Super: 1,
    TaggedTemplateExpression: 1,
    TemplateElement: 1,
    TemplateLiteral: 1,
    YieldExpression: 1,
    JSXIdentifier: 1,
    JSXNamespacedName: 1,
    JSXMemberExpression: 1,
    JSXEmptyExpression: 1,
    JSXExpressionContainer: 1,
    JSXElement: 1,
    JSXClosingElement: 1,
    JSXOpeningElement: 1,
    JSXAttribute: 1,
    JSXSpreadAttribute: 1,
    JSXText: 1,
    ExportDefaultDeclaration: 1,
    ExportNamedDeclaration: 1,
    ExportAllDeclaration: 1,
    ExportSpecifier: 1,
    ImportDeclaration: 1,
    ImportSpecifier: 1,
    ImportDefaultSpecifier: 1,
    ImportNamespaceSpecifier: 1
};

/**
 * 具备生成器特性的类型
 */
var GENERATOR_NODETYPES = {
    FunctionDeclaration: 1,
    FunctionExpression: 1
};

/**
 * 最大遍历节点次数限制
 *
 * @const
 * @type {number}
 */
exports.MAX_TRAVERSE_TIMES = 1000;

/**
 * check es-next code
 *
 * @param {string} code
 * @return {boolean} is-esnext
 */
function detect(code) {

    var isNext = false;

    var ast = parser.parse(Buffer.isBuffer(code) ? code.toString('utf-8') : code, PARSER_CONFIG);
    var traverser = new Traverser();
    var count = 0;
    var max = exports.MAX_TRAVERSE_TIMES;

    traverser.traverse(ast, {
        enter: function (node) {
            if (
                ESNEXT_NODETYPES[node.type]
                || (node.generator || node.async) && GENERATOR_NODETYPES[node.type]
                || node.type === 'Property' && (node.computed || node.method || node.shorthand)
            ) {
                isNext = true;
                this.break();
            }

            if (++count > max) {
                this.break();
            }
        }
    });


    return isNext;
};

// exports
module.exports = detect;
module.exports.default = detect;
