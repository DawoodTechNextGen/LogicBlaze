'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import Link from 'next/link';
import { calculateRankMathSeoScore } from '../../../../lib/rankmath-seo';
import { 
  Sparkles, CheckCircle2, AlertCircle, Eye, Save, ArrowLeft,
  Bold, Italic, Underline, Heading1, Heading2, List, Link2, 
  Tag, X, Globe, User, FolderOpen, Calendar, HelpCircle
} from 'lucide-react';

export default function NewBlogPostPage(): JSX.Element {
  const [title, setTitle] = useState<string>('Building High-Performance Enterprise Applications with Next.js 15');
  const [slug, setSlug] = useState<string>('building-high-performance-enterprise-applications-with-nextjs-15');
  const [category, setCategory] = useState<string>('Software Development');
  const [author, setAuthor] = useState<string>('LogicBlaze Tech Lead');
  
  // HTML rich content
  const [content, setContent] = useState<string>(
    `<h2>Optimizing Next.js for Enterprise</h2><p>High-performance software development requires modern frameworks and optimized server architecture. In this comprehensive guide, we explore how Next.js 15 App Router delivers lightning-fast page speed, server-side rendering, and seamless RankMath On-Page SEO optimizations.</p><ul><li><strong>Speed:</strong> Zero loading delay</li><li><strong>SEO:</strong> Integrated structured metadata</li></ul>`
  );
  
  const editorRef = useRef<HTMLDivElement>(null);

  // Set initial content once on mount
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== content) {
      editorRef.current.innerHTML = content;
    }
  }, []);

  // Tag inputs
  const [tags, setTags] = useState<string[]>(['NextJS 15', 'SEO', 'React', 'Enterprise']);
  const [tagInput, setTagInput] = useState<string>('');

  // RankMath SEO State
  const [focusKeyword, setFocusKeyword] = useState<string>('Next.js 15');
  const [seoTitle, setSeoTitle] = useState<string>('Building High-Performance Enterprise Apps with Next.js 15');
  const [metaDesc, setMetaDesc] = useState<string>('Discover how Next.js 15 App Router delivers high-performance web applications, server components, and enterprise speed for startups.');
  const [published, setPublished] = useState<boolean>(false);

  // Calculate Real-Time RankMath SEO Analysis
  const seoAnalysis = useMemo(() => {
    return calculateRankMathSeoScore(seoTitle, metaDesc, slug, content, focusKeyword);
  }, [seoTitle, metaDesc, slug, content, focusKeyword]);

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    setPublished(true);
    setTimeout(() => setPublished(false), 4000);
  };

  // Rich text actions
  const execEditorCommand = (command: string, value: string = '') => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML);
    }
  };

  const addLink = () => {
    const url = prompt('Enter the link URL:');
    if (url) {
      execEditorCommand('createLink', url);
    }
  };

  // Add tags
  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const cleaned = tagInput.trim().replace(/,$/, '');
      if (cleaned && !tags.includes(cleaned)) {
        setTags([...tags, cleaned]);
      }
      setTagInput('');
    }
  };

  const removeTag = (indexToRemove: number) => {
    setTags(tags.filter((_, idx) => idx !== indexToRemove));
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', paddingBottom: '50px' }}>
      
      {/* WordPress Top Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', borderBottom: '1px solid var(--border-light)', paddingBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <Link href="/admin/blogs" style={{ color: '#64748B', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: '700' }}>
            <ArrowLeft size={16} /> Posts
          </Link>
          <div style={{ height: '20px', width: '1px', background: 'var(--border-light)' }}></div>
          <span style={{ fontSize: '13px', color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Globe size={14} /> Draft saved locally
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button 
            onClick={() => alert("Previewing HTML output:\n\n" + content)} 
            className="btn btn-secondary" 
            style={{ padding: '8px 16px', background: '#FFFFFF', fontSize: '13px', border: '1px solid var(--border-light)' }}
          >
            <Eye size={15} /> View HTML Output
          </button>
          
          <button onClick={handlePublish} className="btn btn-primary" style={{ padding: '8px 20px', fontSize: '13px' }}>
            <Save size={15} /> Publish Post
          </button>
        </div>
      </div>

      {published && (
        <div style={{ background: '#DCFCE7', border: '1px solid #86EFAC', color: '#15803D', padding: '14px 20px', borderRadius: '12px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '15px', fontWeight: '700', boxShadow: 'var(--shadow-sm)' }}>
          <CheckCircle2 size={20} /> Post successfully published to site! Live URL: /blog/{slug}
        </div>
      )}

      {/* WordPress Gutenberg style Layout Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '32px', alignItems: 'start' }}>
        
        {/* Left Column: Editor Body */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', background: '#FFFFFF', padding: '36px', borderRadius: '16px', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
          
          {/* Gutenberg Style Document Title */}
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
              }}
              placeholder="Add title"
              style={{
                width: '100%',
                border: 'none',
                borderBottom: '2px solid transparent',
                fontSize: '32px',
                fontWeight: '800',
                color: 'var(--text-main)',
                padding: '8px 0',
                outline: 'none',
                fontFamily: 'var(--font-family)',
                letterSpacing: '-0.02em',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.target.style.borderBottom = '2px solid var(--logo-electric-cyan)'}
              onBlur={(e) => e.target.style.borderBottom = '2px solid transparent'}
            />
          </div>

          {/* Editable Permalink URL */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: '#64748B', marginTop: '-12px', marginBottom: '8px' }}>
            <span style={{ fontWeight: '600' }}>Permalink:</span>
            <span style={{ color: '#94A3B8' }}>https://logicblaze.com/blog/</span>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'))}
              style={{
                border: 'none',
                borderBottom: '1px dashed var(--logo-royal-blue)',
                padding: '0 4px',
                color: 'var(--logo-royal-blue)',
                fontWeight: '700',
                outline: 'none',
                background: 'transparent',
                fontSize: '13px'
              }}
              title="Click to edit slug"
            />
          </div>

          {/* WordPress Block Editor Toolbar */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '6px', 
            background: 'var(--bg-subtle)', 
            padding: '8px', 
            borderRadius: '8px', 
            border: '1px solid var(--border-light)',
            flexWrap: 'wrap'
          }}>
            <button type="button" onClick={() => execEditorCommand('bold')} title="Bold" style={{ padding: '6px', borderRadius: '4px', border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Bold size={16} color="var(--text-main)" />
            </button>
            <button type="button" onClick={() => execEditorCommand('italic')} title="Italic" style={{ padding: '6px', borderRadius: '4px', border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Italic size={16} color="var(--text-main)" />
            </button>
            <button type="button" onClick={() => execEditorCommand('underline')} title="Underline" style={{ padding: '6px', borderRadius: '4px', border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Underline size={16} color="var(--text-main)" />
            </button>
            <div style={{ width: '1px', height: '18px', background: 'var(--border-light)', margin: '0 4px' }}></div>
            
            <button type="button" onClick={() => execEditorCommand('formatBlock', '<h1>')} title="Heading 1" style={{ padding: '6px', borderRadius: '4px', border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Heading1 size={16} color="var(--text-main)" />
            </button>
            <button type="button" onClick={() => execEditorCommand('formatBlock', '<h2>')} title="Heading 2" style={{ padding: '6px', borderRadius: '4px', border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Heading2 size={16} color="var(--text-main)" />
            </button>
            <div style={{ width: '1px', height: '18px', background: 'var(--border-light)', margin: '0 4px' }}></div>

            <button type="button" onClick={() => execEditorCommand('insertUnorderedList')} title="Bullet List" style={{ padding: '6px', borderRadius: '4px', border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <List size={16} color="var(--text-main)" />
            </button>
            <button type="button" onClick={addLink} title="Add Link" style={{ padding: '6px', borderRadius: '4px', border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Link2 size={16} color="var(--text-main)" />
            </button>
          </div>

          {/* HTML WYSIWYG Editor area */}
          <div style={{ position: 'relative' }}>
            <div
              ref={editorRef}
              contentEditable
              onInput={handleInput}
              style={{
                width: '100%',
                minHeight: '380px',
                padding: '16px',
                borderRadius: '8px',
                border: '1px solid var(--border-light)',
                fontSize: '15px',
                lineHeight: '1.8',
                outline: 'none',
                background: '#FFFFFF',
                color: 'var(--text-main)',
                overflowY: 'auto'
              }}
              data-placeholder="Start writing article details..."
            />
          </div>

          {/* Live Character Count details */}
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#64748B', borderTop: '1px solid var(--border-light)', paddingTop: '12px' }}>
            <span>Words: {content.split(/\s+/).filter(Boolean).length}</span>
            <span>HTML Length: {content.length} characters</span>
          </div>
        </div>

        {/* Right Column: WordPress widgets & RankMath */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Publish Widget */}
          <div style={{ background: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: '12px', padding: '20px', boxShadow: 'var(--shadow-sm)' }}>
            <h4 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Globe size={15} color="var(--logo-royal-blue)" /> Publish Settings
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: '#475569' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Status:</span>
                <strong style={{ color: 'var(--text-main)' }}>Draft</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Visibility:</span>
                <strong style={{ color: 'var(--text-main)' }}>Public</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Author:</span>
                <strong style={{ color: 'var(--text-main)' }}>{author || 'Admin'}</strong>
              </div>
            </div>
          </div>

          {/* RankMath SEO Rating Widget */}
          <div style={{ background: '#FFFFFF', border: `2px solid ${seoAnalysis.gradeColor}`, borderRadius: '12px', padding: '20px', boxShadow: 'var(--shadow-md)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Sparkles size={16} color={seoAnalysis.gradeColor} />
                <h4 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--text-main)' }}>RankMath SEO</h4>
              </div>
              <div style={{ fontSize: '20px', fontWeight: '800', color: seoAnalysis.gradeColor }}>
                {seoAnalysis.score}/100
              </div>
            </div>
            
            <div style={{ background: 'var(--bg-subtle)', borderRadius: '99px', height: '6px', overflow: 'hidden', marginBottom: '12px' }}>
              <div style={{ width: `${seoAnalysis.score}%`, background: seoAnalysis.gradeColor, height: '100%' }} />
            </div>

            {/* Checklist */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {seoAnalysis.tests.slice(0, 3).map((test) => (
                <div key={test.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', fontSize: '11px' }}>
                  {test.passed ? (
                    <CheckCircle2 size={13} color="#22C55E" style={{ flexShrink: 0, marginTop: '2px' }} />
                  ) : (
                    <AlertCircle size={13} color="#F43F5E" style={{ flexShrink: 0, marginTop: '2px' }} />
                  )}
                  <span style={{ color: 'var(--text-main)' }}>{test.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Categories Widget */}
          <div style={{ background: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: '12px', padding: '20px', boxShadow: 'var(--shadow-sm)' }}>
            <h4 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <FolderOpen size={15} color="var(--logo-royal-blue)" /> Category Selection
            </h4>
            <select 
              value={category} 
              onChange={(e) => setCategory(e.target.value)} 
              style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-light)', fontSize: '13px' }}
            >
              <option value="Software Development">Software Development</option>
              <option value="AI Solutions">AI Solutions</option>
              <option value="Digital Marketing">Digital Marketing</option>
            </select>
          </div>

          {/* Search Tags Widget (Requested Feature) */}
          <div style={{ background: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: '12px', padding: '20px', boxShadow: 'var(--shadow-sm)' }}>
            <h4 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Tag size={15} color="var(--logo-royal-blue)" /> Search Tags
            </h4>
            
            {/* Tag Pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
              {tags.map((tag, idx) => (
                <span 
                  key={idx} 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '4px', 
                    fontSize: '11px', 
                    fontWeight: '700', 
                    background: 'var(--primary-50)', 
                    color: 'var(--logo-royal-blue)', 
                    padding: '3px 8px', 
                    borderRadius: '99px' 
                  }}
                >
                  {tag}
                  <button 
                    type="button" 
                    onClick={() => removeTag(idx)} 
                    style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                  >
                    <X size={10} color="var(--logo-royal-blue)" />
                  </button>
                </span>
              ))}
            </div>

            {/* Input tag */}
            <input
              type="text"
              placeholder="Type tag and press Enter"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: '8px',
                border: '1px solid var(--border-light)',
                fontSize: '13px'
              }}
            />
            <p style={{ fontSize: '10px', color: '#64748B', marginTop: '6px' }}>
              Separate tags with commas or press Enter.
            </p>
          </div>

          {/* Google Snippet Preview */}
          <div style={{ background: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: '12px', padding: '20px', boxShadow: 'var(--shadow-sm)' }}>
            <h4 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Eye size={15} color="var(--logo-royal-blue)" /> SERP Snippet Preview
            </h4>
            <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '8px', border: '1px solid #E2E8F0', overflow: 'hidden' }}>
              <div style={{ fontSize: '11px', color: '#202124', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                https://logicblaze.com › {slug}
              </div>
              <div style={{ fontSize: '15px', fontWeight: '600', color: '#1a0dab', marginTop: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {seoTitle || title}
              </div>
              <div style={{ fontSize: '12px', color: '#4d5156', marginTop: '2px', lineHeight: '1.4' }}>
                {metaDesc || 'Start typing in SEO settings to update preview...'}
              </div>
            </div>
          </div>

          {/* SEO Details Config */}
          <div style={{ background: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: '12px', padding: '20px', boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '4px' }}>Focus Keyword:</label>
              <input type="text" value={focusKeyword} onChange={(e) => setFocusKeyword(e.target.value)} style={{ width: '100%', padding: '6px 10px', borderRadius: '6px', border: '1px solid var(--border-light)', fontSize: '12px' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '4px' }}>SEO Title:</label>
              <input type="text" value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} style={{ width: '100%', padding: '6px 10px', borderRadius: '6px', border: '1px solid var(--border-light)', fontSize: '12px' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '4px' }}>Meta Desc:</label>
              <textarea rows={2} value={metaDesc} onChange={(e) => setMetaDesc(e.target.value)} style={{ width: '100%', padding: '6px 10px', borderRadius: '6px', border: '1px solid var(--border-light)', fontSize: '12px', resize: 'vertical' }} />
            </div>
          </div>

        </div>

      </div>

    </div>
  );

  // Helper inside editor to synchronize HTML contents
  function handleInput() {
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML);
    }
  }
}
