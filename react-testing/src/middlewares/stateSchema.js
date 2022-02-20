// eslint-disable-next-line import/no-anonymous-default-export
export default {
	$schema: "http://json-schema.org/draft-07/schema",
	$id: "http://example.com/example.json",
	type: "object",
	title: "The root schema",
	description: "The root schema comprises the entire JSON document.",
	default: {},
	examples: [
		{
			comment: ["Comment #1", "Comment #2"],
			auth: true,
		},
	],
	required: ["comment", "auth"],
	properties: {
		comment: {
			$id: "#/properties/comment",
			type: "array",
			title: "The comment schema",
			description: "An explanation about the purpose of this instance.",
			default: [],
			examples: [["Comment #1", "Comment #2"]],
			additionalItems: true,
			items: {
				$id: "#/properties/comment/items",
				anyOf: [
					{
						$id: "#/properties/comment/items/anyOf/0",
						type: "string",
						title: "The first anyOf schema",
						description:
							"An explanation about the purpose of this instance.",
						default: "",
						examples: ["Comment #1", "Comment #2"],
					},
				],
			},
		},
		auth: {
			$id: "#/properties/auth",
			type: "boolean",
			title: "The auth schema",
			description: "An explanation about the purpose of this instance.",
			default: false,
			examples: [true],
		},
	},
	additionalProperties: true,
}
