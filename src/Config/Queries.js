import gql from "graphql-tag";


const signupStudent = gql`
mutation signupStudent(
 $firstName: String,
 $lastName: String,
 $email: AWSEmail,
 $city: String,
 $state: String,
 $student_id: ID
){signupStudent(input: {
    firstName: $firstName,
    lastName: $lastName,
    email: $email,
    city: $city,
    state: $state,
    student_id: $student_id
}){
    firstName
	lastName
	email
	city
	state
	student_id
}
}
`

const signupCompany = gql`
mutation signupCompany(
    $companyName: String,
	$email: AWSEmail,
	$city: String,
	$state: String,
	$company_id: ID
){signupCompany(input:{
    companyName: $companyName
	email: $email,
	city: $city,
	state: $state,
	company_id: $company_id
}){
    companyName
	email
	city
	state
	company_id
}}
`

const getStudents = gql`
query getStudents(
	$companyID: ID
){getStudents(
	companyID: $companyID
){
    firstName
	lastName
	email
	city
	state
	student_id
}}
`

const getCompanies = gql`
query getCompanies(
	$StudentID: ID
){getCompanies(
	StudentID: $StudentID
){
    companyName
	email
	city
    state
    company_id
}}
`


const getStudentData = gql`
query getStudentData(
 $StudentID: ID
){getStudentData(
    StudentID: $StudentID
){
    firstName
	lastName
	email
	city
	state
	student_id
}
}
`

const getCompanyData = gql`
query getCompanyData(
 $companyID: ID
){getCompanyData(
    companyID: $companyID
){
    companyName
	email
	city
	state
}
}
`

export { signupStudent, signupCompany, getStudents, getStudentData, getCompanies, getCompanyData };