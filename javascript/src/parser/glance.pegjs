GlanceReference = scopes:Scope+ subject:Subject {return scopes.concat([subject])}
  / subject:Subject {return [subject]}
  / .* {return []}

ScopeChar = ">"
IntersectChar = "^"
OptionChar = "#"
SeparatorChar = ","

Scope = intersections:Intersection+ ScopeChar {return intersections}
Subject = intersections:Intersection+ {return intersections}
Intersection = target:Target IntersectChar? {return target}

Target = label:LabelCharacter+ options:Options? Whitespace? {
  return {
    label: label.join('').trim(),
    options: options ? options.options : [],
    useDefaultOptions: options ? options.useDefaultOptions : true
  }
}
/
options:Options Whitespace? {
  return {
    options: options || []
  }
}

LabelCharacter
  = !(EscapableChars) c:. { return c }
  / EscapedSequence

Options = OptionChar useDefaultOptions:OptionChar? options:Option* { return {options:options, useDefaultOptions: useDefaultOptions?false:true}; }

Option = name:Character+ OptionSeparatorChar? { return name.join("").trim() }

OptionSeparatorChar = OptionChar / SeparatorChar

EscapeChar = "\\"
EscapableChars = EscapeChar / ScopeChar / OptionChar / IntersectChar

EscapedSequence = EscapeChar c:(EscapableChars) { return c }

Character = !(EscapableChars / SeparatorChar) c:. { return c }

Whitespace = [ \t\r\n]+