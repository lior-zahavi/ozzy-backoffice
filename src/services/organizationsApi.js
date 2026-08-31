import {getJson,postJson,} from './apiClient';

const LIST_API_URL =import.meta.env.VITE_ORGANIZATIONS_LIST_API_URL;

const GET_API_URL =import.meta.env.VITE_ORGANIZATION_GET_API_URL;

const CREATE_API_URL =import.meta.env.VITE_CREATE_ORGANIZATION_API_URL;

function removeUndefinedValues(object) {
  return Object.fromEntries(
    Object.entries(object).filter(
      ([, value]) => value !== undefined,
    ),
  );
}

function createGroupPayload(group) {
  return removeUndefinedValues({
    id: group.id,
    name: {
      HE: group.nameHe,
      EN: group.nameEn,
    },
    expiry: group.expiry || undefined,
  });
}

function createOrganizationPayload(organization,locale,)
 {
  const schoolName =locale === 'he'? organization.nameHe: organization.nameEn;

  return removeUndefinedValues({
    schoolName,
    org_token: organization.token,
    logo: organization.logoUrl || undefined,
    il_school_id:organization.schoolId || undefined,
    id: organization.id,
    school_role:organization.schoolRole || undefined,
    status:organization.status === 'active'
        ? 'Active': 'Inactive',
    groups: organization.groups.map(createGroupPayload,),
  });
}

function mapOrganizationToFormValues(organization,)
 {
  const identity = organization.identity ?? {};

  const mediaAssets =organization.media_assets ?? {};

  const integration =organization.integration ?? {};

  const groups = Array.isArray(organization.groups,)? organization.groups: [];

  return {
    id: identity.id ?? '',

    status:identity.status?.toLowerCase() ?? 'active',

    nameEn: identity.name?.EN ?? '',
    nameHe: identity.name?.HE ?? '',

    studentQuota:identity.student_quota ?? '',

    logoUrl:mediaAssets.manual_url ?? '',

    schoolId:integration.il_school_id ?? '',

    schoolRole:integration.school_role ?? '',

    token:integration.org_token ?? '',

    groups: groups.map((group) => ({
      id: group.id,
      nameEn: group.name?.EN ?? '',
      nameHe: group.name?.HE ?? '',

      expiry:group.expiry?.slice(0, 10) ?? '',
    })),
  };
}

export async function listOrganizationsRequest(authToken,signal,)
 {
  const data = await getJson(
    LIST_API_URL,
    authToken,
    signal,
  );

  if (!data?.success ||!Array.isArray(data.organizations))
 {
    throw new Error("The organizations response is invalid.",);
  }

  return data.organizations;
}

export async function getOrganizationRequest(
  organizationId,
  authToken,
  signal,
) {
  if (!GET_API_URL) {
    const error = new Error("Organization API endpoint is not configured.",);

    error.status = 0;
    throw error;
  }

  const url = new URL(GET_API_URL);

  url.searchParams.set('org_id',organizationId,);

  const data = await getJson(
    url.toString(),
    authToken,
    signal,
  );

  if (!data?.success || !data.organization) {
    throw new Error("The organization response is invalid.",);
  }

  return mapOrganizationToFormValues(data.organization,);
}

export function createOrganizationRequest(organization,authToken,locale = 'en',)
 {
  const payload = createOrganizationPayload(organization,locale,);

  return postJson(
    CREATE_API_URL,
    payload,
    authToken,
  );
}