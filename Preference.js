class Preference extends DatabaseTable {
    preferenceType = '';
    preference = undefined;

    static columns = [
        'PreferenceType',
        'Preference'
    ];

    static preferenceAt(preferenceName) {
        return (this.instances.get(preferenceName)).preference;
    }

    setPreferenceType(aString) {
        this.preferenceType = aString;
    }

    setPreference(anObject) {
        this.preference = anObject;
    }
}