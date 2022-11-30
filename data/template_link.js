const templates = new Map([
	["default", {
		"c": "::1",
		"l" : null
	}],
	["o.tab", {
		"c": "/::1",
		"l" : "/lightning/o/::1/home"
	}],
	["o.config", {
		"c": "/::1?setupid=CustomObjects",
		"l" : "/lightning/setup/ObjectManager/::1/view"
	}],
	["o.sharing", {
		"c": "/p/own/OrgSharingDetail?setupid=SecuritySharing&st=::1",
		"l" : null
	}],
	["o.profile", {
		"c": "/::profile?s=ObjectsAndTabs&o=::1",
		"l" : null
	}],
	["cs.tab", {
		"c": "/setup/ui/listCustomSettingsData.apexp?id=::1",
		"l" : "/one/one.app#/alohaRedirect/setup/ui/listCustomSettingsData.apexp?id=::1"
	}],
	["cs.config", {
		"c": "/setup/ui/viewCustomSettings.apexp?setupid=CustomSettings&id=::1",
		"l" : "/one/one.app#/alohaRedirect/::1?setupid=CustomSettings"
	}],
	["cm.tab", {
		"c": "/::1",
		"l" : null
	}],
	["cm.tab", {
		"c": "/::1?setupid=CustomMetadata",
		"l" : "/one/one.app#/alohaRedirect/::1?setupid=CustomMetadata"
	}],
	["cm.config", {
		"c": "/::1?setupid=CustomMetadata",
		"l" : "/lightning/setup/CustomMetadata/page?address=%2F::1&setupid=CustomMetadata"
	}],
	["vf", {
		"c": "/::1",
		"l" : "/lightning/setup/ApexPages/page?address=%2F::1"
	}],
	["profile", {
		"c": "/::1",
		"l" : "/lightning/setup/EnhancedProfiles/page?address=%2F::1"
	}],
	["apex", {
		"c": "/::1",
		"l" : "/lightning/setup/ApexPages/page?address=%2F::1"
	}],
	["trigger", {
		"c": "/::1",
		"l" : "/lightning/setup/ApexTriggers/page?address=%2F::1"
	}],
	["connected_app", {
		"c": "/lightning/setup/ConnectedApplication/page?address=/app/mgmt/forceconnectedapps/forceAppDetail.apexp?connectedAppId=::1",
		"l" : null
	}],
	["users", {
		"c": "/::1?noredirect=1&isUserEntityOverride=1",
		"l" : "/lightning/setup/ManageUsers/page?address=%2F::1%3Fnoredirect%3D1%26isUserEntityOverride%3D1&0.source=alohaHeader"
	}],
	["permissionset", {
		"c": "/::1",
		"l" : "/lightning/setup/PermSets/page?address=%2F::1"
	}],
	["delegatedadmin", {
		"c": "/::1",
		"l" : "/lightning/setup/PermSets/page?address=%2F::1"
	}]
]);
