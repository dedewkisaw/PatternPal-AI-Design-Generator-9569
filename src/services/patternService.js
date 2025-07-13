import supabase from '../lib/supabase'

const TABLE_NAME = 'patterns_oe83fkvm7d'
const VERSIONS_TABLE = 'pattern_versions_oe83fkvm7d'
const TAGS_TABLE = 'pattern_tags_oe83fkvm7d'
const LIKES_TABLE = 'pattern_likes_oe83fkvm7d'

export const patternService = {
  // Get all public patterns
  async getPublicPatterns() {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('*, pattern_likes_oe83fkvm7d(count)')
      .eq('is_public', true)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Get user's patterns
  async getUserPatterns(userId) {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('*, pattern_likes_oe83fkvm7d(count)')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Get a pattern by id
  async getPatternById(id) {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('*, pattern_versions_oe83fkvm7d(*), pattern_tags_oe83fkvm7d(*)')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  // Create a new pattern
  async createPattern(pattern) {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .insert(pattern)
      .select()
    
    if (error) throw error
    return data[0]
  },

  // Update a pattern
  async updatePattern(id, updates) {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
    
    if (error) throw error
    return data[0]
  },

  // Create a new version of a pattern
  async createPatternVersion(patternId, version, settings, prompt) {
    const { data, error } = await supabase
      .from(VERSIONS_TABLE)
      .insert({
        pattern_id: patternId,
        version,
        settings,
        prompt
      })
      .select()
    
    if (error) throw error
    return data[0]
  },

  // Add tags to a pattern
  async addPatternTags(patternId, tags) {
    const tagObjects = tags.map(tag => ({
      pattern_id: patternId,
      tag
    }))

    const { data, error } = await supabase
      .from(TAGS_TABLE)
      .insert(tagObjects)
    
    if (error) throw error
    return data
  },

  // Like a pattern
  async likePattern(patternId, userId) {
    const { data, error } = await supabase
      .from(LIKES_TABLE)
      .insert({
        pattern_id: patternId,
        user_id: userId
      })
    
    if (error && error.code !== '23505') throw error // Ignore unique constraint errors
    return true
  },

  // Unlike a pattern
  async unlikePattern(patternId, userId) {
    const { error } = await supabase
      .from(LIKES_TABLE)
      .delete()
      .eq('pattern_id', patternId)
      .eq('user_id', userId)
    
    if (error) throw error
    return true
  },

  // Check if user liked a pattern
  async hasUserLiked(patternId, userId) {
    const { data, error } = await supabase
      .from(LIKES_TABLE)
      .select('id')
      .eq('pattern_id', patternId)
      .eq('user_id', userId)
      .single()
    
    if (error && error.code !== 'PGRST116') return false // PGRST116 is for not found
    return !!data
  }
}