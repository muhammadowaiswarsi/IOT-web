import gql from "graphql-tag";

const stage_code_add = gql`
  mutation stage_code_add($code_string: String, $timestamp: String) {
    stage_code_add(code_string: $code_string, timestamp: $timestamp) {
      code_string
      timestamp
    }
  }
`;
const stage_code_delete = gql`
  mutation stage_code_delete($code_string: String, $timestamp: String) {
    stage_code_delete(code_string: $code_string, timestamp: $timestamp) {
      code_string
      timestamp
    }
  }
`;

const stage_code_query = gql`
  query stage_code {
    stage_code {
      code_string
      timestamp
    }
  }
`;

const on_Add_stage_code = gql`
  subscription on_Add_stage_code {
    on_Add_stage_code {
      timestamp
      code_string
    }
  }
`;

const on_Delete_stage_code = gql`
  subscription on_Delete_stage_code {
    on_Delete_stage_code {
      timestamp
      code_string
    }
  }
`;

export {
  stage_code_add,
  stage_code_delete,
  stage_code_query,
  on_Add_stage_code,
  on_Delete_stage_code
};
