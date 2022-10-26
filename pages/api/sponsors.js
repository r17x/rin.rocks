export const config = {
  runtime: "experimental-edge",
};

const ghGQLURL = process.env.GH_GRAPHQL_URL || "";
const ghToken = process.env.GH_TOKEN || "";
const authorization = `bearer ${ghToken}`;

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

const filterByHasSponsorListing = (sponsor) => sponsor.hasSponsorsListing;
const removeSponsorsField = ({ hasSponsorsListing: _, ...fields }) => fields;

const sponsorsQuery = ({ login, first }) =>
  `query { 
      user(login: "${login}"){
        sponsors(first: ${first || 100}) {
          totalCount 
          nodes {
            ... on User {
              name
              avatarUrl
              login
              websiteUrl
              twitterUsername
              hasSponsorsListing
            }
          }
      }
  }
}
    `;

const getSponsors = (login) =>
  fetch(ghGQLURL, {
    method: "POST",
    headers: { authorization },
    body: JSON.stringify({
      query: sponsorsQuery({ login }),
      variables: {},
    }),
  })
    .then((r) => r.json())
    .then(({ data }) => ({
      ...data,
      user: {
        ...data.user,
        sponsorsCount: data.user.sponsors.totalCount,
        sponsors: data.user.sponsors.nodes.filter(filterByHasSponsorListing).map(removeSponsorsField),
      },
    }));

export default function Sponsors(req) {
  try {
    const { searchParams } = new URL(req.url);
    const login = searchParams.get("username") || "";
    if (login.length === 0) throw new Error("username params is required!");

    return getSponsors(login).then(responseOk).catch(responseError);
  } catch (e) {
    return responseError(e);
  }
}
