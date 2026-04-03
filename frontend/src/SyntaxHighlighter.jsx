import { useMemo } from "react";

const SyntaxHighlighter = ({ code, language }) => {
  const highlightedCode = useMemo(() => {
    if (!code) return "";

    const escapeHtml = (value) =>
      value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

    // Escape model output before injecting markup.
    let highlighted = escapeHtml(code);

    // Keywords based on language
    const keywords = {
      python: [
        "def",
        "class",
        "if",
        "else",
        "elif",
        "for",
        "while",
        "try",
        "except",
        "finally",
        "with",
        "as",
        "import",
        "from",
        "return",
        "yield",
        "lambda",
        "and",
        "or",
        "not",
        "in",
        "is",
        "True",
        "False",
        "None",
      ],
      javascript: [
        "function",
        "const",
        "let",
        "var",
        "if",
        "else",
        "for",
        "while",
        "do",
        "switch",
        "case",
        "break",
        "continue",
        "return",
        "try",
        "catch",
        "finally",
        "throw",
        "new",
        "this",
        "class",
        "extends",
        "true",
        "false",
        "null",
        "undefined",
      ],
      java: [
        "public",
        "private",
        "protected",
        "static",
        "final",
        "abstract",
        "class",
        "interface",
        "enum",
        "if",
        "else",
        "for",
        "while",
        "do",
        "switch",
        "case",
        "break",
        "continue",
        "return",
        "try",
        "catch",
        "finally",
        "throw",
        "throws",
        "new",
        "this",
        "super",
        "true",
        "false",
        "null",
      ],
      cpp: [
        "int",
        "char",
        "float",
        "double",
        "bool",
        "void",
        "class",
        "struct",
        "enum",
        "if",
        "else",
        "for",
        "while",
        "do",
        "switch",
        "case",
        "break",
        "continue",
        "return",
        "try",
        "catch",
        "throw",
        "new",
        "delete",
        "this",
        "true",
        "false",
        "nullptr",
      ],
    };

    // Apply keyword highlighting
    const langKeywords = keywords[language] || [];
    langKeywords.forEach((keyword) => {
      const regex = new RegExp(`\\b${keyword}\\b`, "g");
      highlighted = highlighted.replace(
        regex,
        `<span class="syntax-keyword">${keyword}</span>`,
      );
    });

    // Highlight strings
    highlighted = highlighted.replace(
      /(["'])((?:\\.|(?!\1)[^\\])*?)\1/g,
      '<span class="syntax-string">$1$2$1</span>',
    );

    // Highlight comments
    if (language === "python") {
      highlighted = highlighted.replace(
        /#.*$/gm,
        '<span class="syntax-comment">$&</span>',
      );
    } else if (["javascript", "java", "cpp"].includes(language)) {
      highlighted = highlighted.replace(
        /\/\/.*$/gm,
        '<span class="syntax-comment">$&</span>',
      );
      highlighted = highlighted.replace(
        /\/\*[\s\S]*?\*\//g,
        '<span class="syntax-comment">$&</span>',
      );
    }

    // Highlight numbers
    highlighted = highlighted.replace(
      /\b\d+\.?\d*\b/g,
      '<span class="syntax-number">$&</span>',
    );

    return highlighted;
  }, [code, language]);

  return (
    <pre
      className="syntax-output"
      dangerouslySetInnerHTML={{ __html: highlightedCode }}
    />
  );
};

export default SyntaxHighlighter;
