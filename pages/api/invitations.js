export const config = {
  runtime: "experimental-edge",
};

const ghAPIURL = process.env.GH_API_URL || "";
const ghToken = process.env.GH_TOKEN || "";
const authorization = `bearer ${ghToken}`;
const repositories = (process.env.GH_REPOSITORIES || "").split(",").map(Number);

const ok = (data) => ({ data, error: null });
const error = (error_) => ({ data: null, error: error_ });

const responseOk = (data) =>
  new Response(JSON.stringify(ok(data)), {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });

const responseError = (e) =>
  new Response(JSON.stringify(error(e.message || "something wrong :'(")), {
    status: 500,
    headers: {
      "content-type": "application/json",
    },
  });

/** @type Promise<{message: string;}> */
const defaultResponse = (message) => Promise.resolve({ message });

/**
 * @param {Object} payload
 * @param {number} payload.id
 * @param {string} payload.login
 * @param {string} payload.owner
 * @param {string} payload.repository
 */
const updateRepositoryCollaborators = ({ login, owner, repository }) => {
  const fetchCollaborators = (opts) => fetch(`${ghAPIURL}/repos/${owner}/${repository}/collaborators/${login}`, opts);
  const checkCollaborator = fetchCollaborators({
    method: "GET",
    headers: {
      accept: "application/vnd.github+json",
      authorization,
    },
  });

  const successResponse = ({ inviter: { login: username } }) => defaultResponse(`invited to ${username || "gak tau"}`);
  const addCollaborator = () =>
    fetchCollaborators({
      method: "PUT",
      headers: {
        accept: "application/vnd.github+json",
        authorization,
        "Content-Length": 0,
      },
      body: JSON.stringify({
        permission: "write",
      }),
    }).then((r) =>
      (() => {
        console.log(r.status);
        return [204, 201].includes(r.status);
      })()
        ? r.json().then(successResponse)
        : defaultResponse("Failed to add collaborators"),
    );

  return checkCollaborator
    .then((res) => (res.status === 204 ? defaultResponse("YOU ALREADY IN THIS REPOSITORY") : addCollaborator()))
    .catch((_) => addCollaborator());
};

/**
 * @param {import('next/server').NextRequest} req
 */
const sendCollaborations = (req) =>
  req
    .json()

    .then(({ action, repository, sender }) =>
      action === "created" && repositories.includes(repository.id)
        ? { sender: sender.login, id: sender.id, repository: repository.name, owner: repository.owner.login }
        : null,
    )
    .then((maybeSender) =>
      maybeSender ? updateRepositoryCollaborators(maybeSender) : defaultResponse("You Have been invited!"),
    );

function Collaborations(req) {
  try {
    return {
      [true]: () => defaultResponse("METHOD not ALLOWED!"),
      [String(req.method) === "POST"]: sendCollaborations,
    }
      .true(req)
      .then(responseOk);
  } catch (e) {
    return responseError(e);
  }
}

export default Collaborations;
