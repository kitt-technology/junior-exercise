import { assertEquals } from "@std/assert";
import { Data, isValid } from "./main.ts";

const testCases: { data: Data; expect: boolean; description: string }[] = [
  {
    data: [{
      team: "engineering",
      time: 1,
      type: "entry",
    }],
    description: "One single entry, and no exit",
    expect: false,
  },
  {
    data: [
      {
        team: "engineering",
        time: 1,
        type: "entry",
      },
      {
        team: "engineering",
        time: 2,
        type: "exit",
      },
    ],
    expect: true,
    description: "Simple passing",
  },
  {
    data: [
      {
        team: "engineering",
        time: 1,
        type: "exit",
      },
    ],
    expect: false,
    description: "Single exit and no entry",
  },
  {
    data: [
      {
        team: "engineering",
        time: 1,
        type: "entry",
      },
      {
        team: "marketing",
        time: 2,
        type: "entry",
      },
      {
        team: "engineering",
        time: 3,
        type: "exit",
      },
      {
        team: "marketing",
        time: 4,
        type: "exit",
      },
    ],
    expect: true,
    description:
      "Two different teams each with one entry and one exit in correct order",
  },
  {
    data: [
      {
        team: "marketing",
        time: 2,
        type: "entry",
      },
      {
        team: "engineering",
        time: 1,
        type: "entry",
      },
      {
        team: "engineering",
        time: 3,
        type: "exit",
      },
      {
        team: "marketing",
        time: 4,
        type: "exit",
      },
    ],
    expect: true,
    description:
      "Entries and exits for different teams out of order but correct based on time",
  },
  {
    data: [
      {
        team: "engineering",
        time: 1,
        type: "entry",
      },
      {
        team: "engineering",
        time: 3,
        type: "entry",
      },
      {
        team: "engineering",
        time: 2,
        type: "exit",
      },
      {
        team: "engineering",
        time: 4,
        type: "exit",
      },
    ],
    expect: true,
    description: "Entry and exits with overlapping times but eventual balance",
  },
  {
    data: [
      {
        team: "engineering",
        time: 1,
        type: "entry",
      },
      {
        team: "marketing",
        time: 2,
        type: "entry",
      },
      {
        team: "engineering",
        time: 3,
        type: "exit",
      },
    ],
    expect: false,
    description:
      "One team has an entry with no exit while another team is correct",
  },
  {
    data: [
      {
        team: "engineering",
        time: 1,
        type: "entry",
      },
      {
        team: "engineering",
        time: 2,
        type: "entry",
      },
      {
        team: "engineering",
        time: 3,
        type: "exit",
      },
      {
        team: "engineering",
        time: 4,
        type: "exit",
      },
    ],
    expect: true,
    description:
      "Multiple entries and exits for the same team in correct order",
  },
  {
    data: [
      {
        team: "engineering",
        time: 1,
        type: "entry",
      },
      {
        team: "engineering",
        time: 2,
        type: "exit",
      },
      {
        team: "engineering",
        time: 3,
        type: "exit",
      },
    ],
    expect: false,
    description: "One extra exit for a team without a corresponding entry",
  },
  {
    data: [
      {
        team: "engineering",
        time: 1,
        type: "entry",
      },
      {
        team: "design",
        time: 2,
        type: "entry",
      },
      {
        team: "engineering",
        time: 3,
        type: "exit",
      },
      {
        team: "design",
        time: 4,
        type: "entry",
      },
      {
        team: "design",
        time: 5,
        type: "exit",
      },
    ],
    expect: false,
    description:
      "A team entry after the exit of another team which was entered twice",
  },
];

Deno.test("validation function", async (t) => {
  for await (const tc of testCases) {
    await t.step(tc.description, () => {
      const res = isValid(tc.data);
      assertEquals(res, tc.expect, tc.description);
    });
  }
});
