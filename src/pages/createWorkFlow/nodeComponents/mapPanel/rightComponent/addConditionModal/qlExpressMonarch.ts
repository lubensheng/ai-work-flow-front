/* eslint-disable no-useless-escape */
// 1. 定义 Monarch 语法配置
const qlExpressMonarch = {
  defaultToken: "invalid",
  keywords: [
    "function",
    "if",
    "else",
    "for",
    "while",
    "break",
    "continue",
    "return",
    "import",
    "new",
    "true",
    "false",
    "null",
    "in",
    "like",
  ],
  operators: [
    "+",
    "-",
    "*",
    "/",
    "%",
    "=",
    "==",
    "!=",
    ">",
    "<",
    ">=",
    "<=",
    "&&",
    "||",
    "!",
    "++",
    "--",
  ],
  brackets: [
    ["{", "}", "delimiter.curly"],
    ["[", "]", "delimiter.square"],
    ["(", ")", "delimiter.parenthesis"],
  ],

  tokenizer: {
    root: [
      // 1. 处理 ${...} 表达式 - 核心部分
      [/\$\{/, { token: "delimiter.curly", next: "@expression" }],
      // 2. 注释 (QLExpress 只支持多行注释)
      [/\/\*/, "comment", "@comment"],
      // 3. 字符串
      [/"([^"\\]|\\.)*$/, "string.invalid"],
      [/"/, "string", "@string_double"],
      [/'([^'\\]|\\.)*$/, "string.invalid"],
      [/'/, "string", "@string_single"],
      // 4. 数字
      [/\d*\.\d+([eE][\-+]?\d+)?/, "number.float"],
      [/\d+/, "number"],
      // 5. 标识符和关键字
      [
        /[a-zA-Z_$][\w$]*/,
        {
          cases: {
            "@keywords": "keyword",
            "@default": "identifier",
          },
        },
      ],
      // 6. 操作符和分隔符
      [/[{}()\[\]]/, "@brackets"],
      [/[;,.]/, "delimiter"],
      [/@operators/, "operator"],
      // 7. 空白符
      [/\s+/, "white"],
    ],
    // ${...} 内部的解析规则
    expression: [
      [/\}/, { token: "delimiter.curly", next: "@pop" }],
      [/[a-zA-Z_$][\w$]*/, "variable"],
      [/[0-9]+/, "number"],
      [/[.]/, "delimiter"],
      [/[+=\-*/]/, "operator"],
      [/\s+/, "white"],
    ],
    comment: [
      [/\*\//, "comment", "@pop"],
      [/[^\/*]+/, "comment"],
      [/[/*]/, "comment"],
    ],
    string_double: [
      [/[^\\"]+/, "string"],
      [/\\./, "string.escape"],
      [/"/, "string", "@pop"],
    ],
    string_single: [
      [/[^\\']+/, "string"],
      [/\\./, "string.escape"],
      [/'/, "string", "@pop"],
    ],
  },
};

export default qlExpressMonarch;
