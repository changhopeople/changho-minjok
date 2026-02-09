export interface StaffMember {
  name: string;
  phone: string; // full phone number for search matching (no hyphens)
  displayPhone: string; // formatted for display
  email: string;
  position: string;
}

export const STAFF_MEMBERS: StaffMember[] = [
  {
    name: '양라윤',
    phone: '01063739563',
    displayPhone: '010-6373-9563',
    email: 'didalsdk12@naver.com',
    position: '사원',
  },
  {
    name: '배형민',
    phone: '01066639978',
    displayPhone: '010-6663-9978',
    email: 'gudals9978@naver.com',
    position: '영업팀장',
  },
  {
    name: '허자현',
    phone: '01049972500',
    displayPhone: '010-4997-2500',
    email: 'gjwkgus@naver.com',
    position: '대표',
  },
];

export function searchStaff(query: string): StaffMember | null {
  const normalized = query.replace(/[-\s]/g, '');

  for (const member of STAFF_MEMBERS) {
    // exact name match
    if (member.name === query.trim()) {
      return member;
    }
    // phone number partial match (full or last 4 digits)
    if (normalized.length >= 4 && member.phone.includes(normalized)) {
      return member;
    }
  }

  return null;
}
