require(['jquery', 'lib/extjs/ext-all', 'lib/rodulib',
'musicexplorer.min',
], function($) {
    $(function() {
        RODU.util.debug("Creating MusicExplorer instance");
        new RODU.musicexplorer.MusicExplorer();
    });
});
