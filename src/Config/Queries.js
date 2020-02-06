import gql from "graphql-tag";


const stage_code_add = gql`
mutation stage_code_add(
	$code_string: String
	$timestamp: String
	){
		stage_code_add(code_string: $code_string
	timestamp: $timestamp
	){
    code_string
}
}
`
const stage_code_delete = gql`
mutation stage_code_delete(
	$code_string: String
	$timestamp: String
	){
	stage_code_delete (code_string: $code_string
	timestamp: $timestamp
	){
    code_string
}
}
`

export { stage_code_add, stage_code_delete };