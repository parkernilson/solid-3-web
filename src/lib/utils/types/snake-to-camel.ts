export type RemoveUnderscore<S extends string> =
  S extends `_${infer T}` ? T : S

export type SnakeToCamelCase<S extends string> =
  S extends `${infer T}_${infer U}` ?
  `${T}${Capitalize<SnakeToCamelCase<U>>}` :
  S

export type CamelCase<Type extends { [key: string]: unknown }> = {
    [Property in keyof Type as SnakeToCamelCase<RemoveUnderscore<string & Property>>]: Type[Property]
}